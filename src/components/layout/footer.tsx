"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Camera, CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { brandConfig } from "@/config/brand";

const footerLinks = {
  Loja: [
    ["Novidades", "/catalogo?ordem=novidades"],
    ["Masculino", "/catalogo?publico=masculino"],
    ["Feminino", "/catalogo?publico=feminino"],
    ["Sale", "/catalogo?sale=true"],
  ],
  Ajuda: [
    ["Entregas e prazos", "/ajuda#entregas"],
    ["Trocas e devoluções", "/ajuda#trocas"],
    ["Guia de medidas", "/ajuda#medidas"],
    ["Atendimento", "/ajuda#atendimento"],
  ],
} as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Digite um e-mail válido.");
      return;
    }
    setMessage("Inscrição confirmada. Bem-vindo ao underground.");
    setEmail("");
  };

  return (
    <footer className="border-t border-dashed border-line bg-ink text-chalk">
      <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-14 border-b border-dashed border-line pb-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Newsletter / private drop</span>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              Entre antes.<br />Vista primeiro.
            </h2>
          </div>
          <form onSubmit={submit} className="self-end" noValidate>
            <label htmlFor="newsletter-email" className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              E-mail para lançamentos
            </label>
            <div className="mt-3 flex border-b border-chalk">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="VOCE@EMAIL.COM"
                className="min-h-14 flex-1 bg-transparent px-1 text-sm uppercase outline-none placeholder:text-muted"
                aria-describedby="newsletter-message"
              />
              <button
                type="submit"
                className="flex min-h-12 items-center gap-2 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition hover:text-wine focus-visible:outline-2"
              >
                Inscrever <ArrowUpRight aria-hidden="true" size={15} />
              </button>
            </div>
            <p id="newsletter-message" aria-live="polite" className="mt-3 min-h-5 text-xs text-muted">
              {message || "Sem spam. Só drops, editoriais e acesso antecipado."}
            </p>
          </form>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href="/" className="text-2xl font-semibold uppercase tracking-[-0.07em]">
              {brandConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Moda contemporânea de linguagem urbana, construída em drops pequenos e combinações sem regra.
            </p>
            <a
              href={brandConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] transition hover:text-wine focus-visible:outline-2"
            >
              <Camera aria-hidden="true" size={16} /> Instagram <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="transition hover:text-wine focus-visible:outline-2">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="atendimento">
            <h3 className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Contato</h3>
            <p className="mt-5 text-sm">Seg–Sex, 9h–18h</p>
            <a href={`mailto:${brandConfig.email}`} className="mt-3 block break-all text-sm text-muted hover:text-wine">
              {brandConfig.email}
            </a>
            <p className="mt-2 text-sm text-muted">{brandConfig.phone}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-dashed border-line pt-7 font-mono text-[8px] uppercase tracking-[0.12em] text-muted lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-5" aria-label="Meios de pagamento demonstrativos">
            <span className="inline-flex items-center gap-1.5"><CreditCard aria-hidden="true" size={14} /> Cartão</span>
            <span className="inline-flex items-center gap-1.5"><Landmark aria-hidden="true" size={14} /> Pix</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck aria-hidden="true" size={14} /> Ambiente seguro</span>
          </div>
          <span>© 2026 {brandConfig.name}. CNPJ 00.000.000/0000-00</span>
          <div className="flex gap-5">
            <Link href="/ajuda#privacidade" className="hover:text-chalk">Privacidade</Link>
            <Link href="/ajuda#termos" className="hover:text-chalk">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
