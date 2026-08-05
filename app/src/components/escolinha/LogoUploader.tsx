"use client";

import { useEffect, useRef, useState } from 'react';
import { Icon, useToast } from '../ds';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
const MAX_SIZE_BYTES = 4 * 1024 * 1024;

export function LogoUploader() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/api/escolinha/logo')
      .then((res) => res.json())
      .then((data: { url: string | null }) => setLogoUrl(data.url))
      .catch(() => {});
  }, []);

  const upload = async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      showToast('Formato não suportado. Use PNG, JPG, WEBP ou SVG.', 'error');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      showToast('Arquivo maior que 4MB.', 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/escolinha/logo', { method: 'POST', body: formData });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      setLogoUrl(url);
      showToast('Logo atualizada.', 'success');
    } catch {
      showToast('Não foi possível enviar a logo. Tente novamente.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = '';
        }}
      />
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        style={{
          height: 80,
          border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-md)',
          background: dragOver ? 'var(--accent-tint)' : 'var(--surface-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: uploading ? 'not-allowed' : 'pointer',
          color: 'var(--text-secondary)',
          fontSize: 'var(--fs-sm)',
          opacity: uploading ? 0.6 : 1,
          transition: 'border-color .1s, background .1s',
        }}
      >
        {logoUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="Logo da escolinha" style={{ height: 44, width: 44, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
            <span>{uploading ? 'Enviando…' : 'Clique ou arraste para trocar'}</span>
          </>
        ) : (
          <>
            <Icon name="image-plus" size={18} />
            {uploading ? 'Enviando…' : 'Clique ou arraste para enviar'}
          </>
        )}
      </div>
    </div>
  );
}
