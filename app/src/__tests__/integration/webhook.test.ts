import { describe, it, expect, afterEach } from 'vitest';
import { Prisma } from '../../generated/prisma/client';
import { testDb } from './setup';

const tag = () => `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

describe('webhook idempotency', () => {
  const eventIds: string[] = [];

  afterEach(async () => {
    if (eventIds.length) {
      await testDb.webhookEvent.deleteMany({ where: { eventId: { in: eventIds } } });
      eventIds.length = 0;
    }
  });

  it('stores a new event on first delivery', async () => {
    const eventId = tag();
    eventIds.push(eventId);

    const event = await testDb.webhookEvent.create({
      data: { provider: 'stub', eventId, type: 'subscription.updated', payload: {} },
    });

    expect(event.eventId).toBe(eventId);
    expect(event.processedAt).toBeNull();
  });

  it('duplicate eventId throws P2002 (unique constraint)', async () => {
    const eventId = tag();
    eventIds.push(eventId);

    await testDb.webhookEvent.create({
      data: { provider: 'stub', eventId, type: 'subscription.updated', payload: {} },
    });

    await expect(
      testDb.webhookEvent.create({
        data: { provider: 'stub', eventId, type: 'subscription.updated', payload: {} },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('duplicate delivery is a no-op (same count before and after)', async () => {
    const eventId = tag();
    eventIds.push(eventId);

    await testDb.webhookEvent.create({
      data: { provider: 'stub', eventId, type: 'subscription.canceled', payload: {} },
    });

    // Simulate idempotent handler: catch P2002 and skip
    let isDuplicate = false;
    try {
      await testDb.webhookEvent.create({
        data: { provider: 'stub', eventId, type: 'subscription.canceled', payload: {} },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        isDuplicate = true;
      } else {
        throw e;
      }
    }

    expect(isDuplicate).toBe(true);

    const count = await testDb.webhookEvent.count({ where: { eventId } });
    expect(count).toBe(1);
  });

  it('marks event as processed after handling', async () => {
    const eventId = tag();
    eventIds.push(eventId);

    const event = await testDb.webhookEvent.create({
      data: { provider: 'stub', eventId, type: 'subscription.activated', payload: {} },
    });

    const updated = await testDb.webhookEvent.update({
      where: { id: event.id },
      data: { processedAt: new Date() },
    });

    expect(updated.processedAt).not.toBeNull();
  });
});
