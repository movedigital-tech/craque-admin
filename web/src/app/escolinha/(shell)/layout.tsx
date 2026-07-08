import { EscolinhaShell } from '@/components/escolinha/EscolinhaShell';

export default function EscolinhaRouteLayout({ children }: { children: React.ReactNode }) {
  return <EscolinhaShell>{children}</EscolinhaShell>;
}
