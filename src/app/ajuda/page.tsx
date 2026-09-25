import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Ruler, ShieldCheck, Truck } from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Ajuda",
  description: "Informações demonstrativas sobre entrega, trocas, medidas e atendimento.",
};

const sections = [
  {
    id: "entregas",
    icon: Truck,
    index: "01",
    title: "Entregas e prazos",
    text: "Enviamos para todo o Brasil. O prazo demonstrativo é exibido ao informar o CEP na página do produto e começa a contar após a confirmação do pedido.",
  },
  {
    id: "trocas",
    icon: ShieldCheck,
    index: "02",
    title: "Trocas e devoluções",
    text: "A primeira troca pode ser solicitada em até 30 dias corridos após o recebimento. A peça deve estar sem sinais de uso e com as etiquetas originais.",
  },
  {
    id: "medidas",
    icon: Ruler,
    index: "03",
    title: "Guia de medidas",
    text: "Cada produto traz um guia em centímetros. Para modelagens amplas, escolha o tamanho que você já usa; para um caimento mais seco, compare tórax, cintura e quadril.",
  },
  {
    id: "atendimento",
    icon: Mail,
    index: "04",
    title: "Atendimento",
    text: `Nosso horário demonstrativo é de segunda a sexta, das 9h às 18h. Fale com a equipe por ${brandConfig.email}.`,
  },
] as const;

export default function HelpPage() {
  return (
    <main id="main-content">
      <header className="grid-noise border-b border-line py-16 sm:py-24">
        <div className="section-shell">
          <span className="eyebrow">Support unit / 001</span>
          <h1 className="mt-3 max-w-5xl text-6xl font-semibold uppercase leading-[0.82] tracking-[-0.09em] sm:text-8xl lg:text-9xl">Ajuda, sem ruído.</h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-muted">Informações da experiência demonstrativa, prontas para receber as políticas finais da loja.</p>
        </div>
      </header>

      <div className="section-shell py-12 sm:py-20">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {sections.map(({ id, icon: Icon, index, title, text }) => (
            <section key={id} id={id} className="scroll-mt-32 border-t border-dashed border-line pt-6">
              <div className="flex items-center justify-between gap-5">
                <Icon aria-hidden="true" size={23} strokeWidth={1.4} />
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">FAQ / {index}</span>
              </div>
              <h2 className="mt-8 text-3xl font-semibold uppercase tracking-[-0.06em] sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{text}</p>
            </section>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-line pt-12 md:grid-cols-2">
          <section id="privacidade" className="scroll-mt-32">
            <span className="eyebrow">Legal / privacy</span>
            <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.05em]">Privacidade</h2>
            <p className="mt-4 text-sm leading-7 text-muted">Neste frontend, sacola, favoritos e histórico de busca ficam somente no armazenamento local do navegador. Não há backend nem envio desses dados.</p>
          </section>
          <section id="termos" className="scroll-mt-32">
            <span className="eyebrow">Legal / terms</span>
            <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.05em]">Termos</h2>
            <p className="mt-4 text-sm leading-7 text-muted">Preços, estoque, frete, cupons e checkout são demonstrativos. Nenhuma compra ou cobrança real é realizada nesta etapa.</p>
          </section>
        </div>

        <Link href="/" className="mt-14 inline-flex min-h-12 items-center gap-3 border border-line px-5 font-mono text-[9px] uppercase tracking-[0.12em] hover:border-chalk"><ArrowLeft aria-hidden="true" size={15} /> Voltar ao início</Link>
      </div>
    </main>
  );
}
