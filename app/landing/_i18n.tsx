"use client";

/* Landing headline-level i18n. Focus: custom routine/plan (not "report").
   Translations are DRAFTS — need native review. */

import { createContext, useContext, useEffect, useState } from "react";

export const LOCALES: [Locale, string][] = [
  ["en", "English"],
  ["fr", "Français"],
  ["es", "Español"],
  ["it", "Italiano"],
  ["tr", "Türkçe"],
  ["id", "Bahasa Indonesia"],
];

export type Locale = "en" | "fr" | "es" | "it" | "tr" | "id";

type Dict = Record<string, string>;

const EN: Dict = {
  "hero.titleA": "Get your skincare routine that",
  "hero.titleB": "actually works",
  "hero.sub": "Skincare is not one-size-fits-all. Our experts analyze your skin & match it with the right products for you.",
  "hero.cta": "Get my custom routine",
  "hero.micro": "1 photo · 2 min · reviewed by Seoul experts",
  "trust.reviews": "1,200+ reviews",
  "team.eyebrow": "MEET YOUR EXPERTS",
  "team.titleA": "Designed by Korean",
  "team.titleB": "skincare experts",
  "team.body": "A team of Korean skincare experts — including Sumin — analyzes your skin and designs a routine made just for you.",
  "team.statSkinsLabel": "skins analyzed",
  "team.statNatsLabel": "nationalities",
  "team.more": "More about us",
  "wyg.eyebrow": "WHAT YOU GET",
  "results.eyebrow": "REAL RESULTS",
  "results.titleA": "Skin that actually",
  "results.titleB": "changed",
  "results.body": "Real customers, real routines — before & after following their 8mirrors plan.",
  "full.eyebrow": "YOUR CUSTOM PLAN",
  "full.titleA": "Everything, in one",
  "full.titleB": "personalized plan",
  "full.body": "Your custom routine and skin guidance, put together into one clear plan — delivered straight to your inbox.",
  "offer.eyebrow": "YOUR CUSTOM ROUTINE",
  "offer.titleA": "Your custom routine,",
  "offer.titleB": "built by experts",
  "offer.save": "60% OFF · SAVE $15",
  "offer.inc1": "A full read of your skin",
  "offer.inc2": "Custom AM & PM routine",
  "offer.inc3": "2 weeks of expert coaching",
  "offer.inc4": "K-beauty products shipped from Seoul",
  "offer.privacyA": "Starts with one photo — we",
  "offer.privacyB": "auto-blur your eyes",
  "offer.privacyC": ", and your photo is never shared or sold.",
  "coach.label": "YOUR 8MIRRORS EXPERTS",
  "bar.delivery": "4–5 day delivery",
  "bar.how": "How it works",
  "bar.cta": "Try it free",
};

const FR: Dict = {
  "hero.titleA": "Une routine de soin qui",
  "hero.titleB": "fonctionne vraiment",
  "hero.sub": "Les soins ne sont pas universels. Nos expertes analysent votre peau et l'associent aux bons produits pour vous.",
  "hero.cta": "Obtenir ma routine",
  "hero.micro": "1 photo · 2 min · revu par nos expertes à Séoul",
  "trust.reviews": "1 200+ avis",
  "team.eyebrow": "NOS EXPERTES",
  "team.titleA": "Conçu par des expertes",
  "team.titleB": "coréennes en soin",
  "team.body": "Une équipe d'expertes coréennes — dont Sumin — analyse votre peau et conçoit une routine faite pour vous.",
  "team.statSkinsLabel": "peaux analysées",
  "team.statNatsLabel": "nationalités",
  "team.more": "En savoir plus",
  "wyg.eyebrow": "CE QUE VOUS OBTENEZ",
  "results.eyebrow": "RÉSULTATS RÉELS",
  "results.titleA": "Une peau vraiment",
  "results.titleB": "transformée",
  "results.body": "De vraies clientes, de vraies routines — avant et après leur plan 8mirrors.",
  "full.eyebrow": "VOTRE PLAN PERSONNALISÉ",
  "full.titleA": "Tout, dans un seul",
  "full.titleB": "plan personnalisé",
  "full.body": "Votre routine sur mesure et vos conseils peau, réunis dans un plan clair — livré dans votre boîte mail.",
  "offer.eyebrow": "VOTRE ROUTINE SUR MESURE",
  "offer.titleA": "Votre routine sur mesure,",
  "offer.titleB": "conçue par des expertes",
  "offer.save": "-60% · ÉCONOMISEZ 15 $",
  "offer.inc1": "Une analyse complète de votre peau",
  "offer.inc2": "Routine personnalisée matin & soir",
  "offer.inc3": "2 semaines de coaching expert",
  "offer.inc4": "Produits K-beauty expédiés de Séoul",
  "offer.privacyA": "Commence par une photo — nous",
  "offer.privacyB": "floutons vos yeux",
  "offer.privacyC": ", et votre photo n'est jamais partagée ni vendue.",
  "coach.label": "VOS EXPERTES 8MIRRORS",
  "bar.delivery": "Livraison 4–5 jours",
  "bar.how": "Comment ça marche",
  "bar.cta": "Essayer gratuitement",
};

const ES: Dict = {
  "hero.titleA": "Una rutina de cuidado que",
  "hero.titleB": "de verdad funciona",
  "hero.sub": "El cuidado de la piel no es igual para todos. Nuestras expertas analizan tu piel y la combinan con los productos ideales para ti.",
  "hero.cta": "Obtener mi rutina",
  "hero.micro": "1 foto · 2 min · revisado por expertas de Seúl",
  "trust.reviews": "1.200+ reseñas",
  "team.eyebrow": "CONOCE A LAS EXPERTAS",
  "team.titleA": "Diseñado por expertas",
  "team.titleB": "coreanas en piel",
  "team.body": "Un equipo de expertas coreanas — incluida Sumin — analiza tu piel y diseña una rutina hecha para ti.",
  "team.statSkinsLabel": "pieles analizadas",
  "team.statNatsLabel": "nacionalidades",
  "team.more": "Más sobre nosotras",
  "wyg.eyebrow": "LO QUE OBTIENES",
  "results.eyebrow": "RESULTADOS REALES",
  "results.titleA": "Una piel que de verdad",
  "results.titleB": "cambió",
  "results.body": "Clientas reales, rutinas reales — antes y después de su plan 8mirrors.",
  "full.eyebrow": "TU PLAN PERSONALIZADO",
  "full.titleA": "Todo, en un solo",
  "full.titleB": "plan personalizado",
  "full.body": "Tu rutina personalizada y tus consejos de piel, reunidos en un plan claro — enviado directo a tu correo.",
  "offer.eyebrow": "TU RUTINA PERSONALIZADA",
  "offer.titleA": "Tu rutina personalizada,",
  "offer.titleB": "creada por expertas",
  "offer.save": "60% DESC. · AHORRA $15",
  "offer.inc1": "Un análisis completo de tu piel",
  "offer.inc2": "Rutina personalizada de día y noche",
  "offer.inc3": "2 semanas de coaching experto",
  "offer.inc4": "Productos K-beauty enviados desde Seúl",
  "offer.privacyA": "Empieza con una foto — nosotras",
  "offer.privacyB": "difuminamos tus ojos",
  "offer.privacyC": ", y tu foto nunca se comparte ni se vende.",
  "coach.label": "TUS EXPERTAS 8MIRRORS",
  "bar.delivery": "Entrega en 4–5 días",
  "bar.how": "Cómo funciona",
  "bar.cta": "Pruébalo gratis",
};

const IT: Dict = {
  "hero.titleA": "Una routine skincare che",
  "hero.titleB": "funziona davvero",
  "hero.sub": "La skincare non è uguale per tutti. I nostri esperti analizzano la tua pelle e la abbinano ai prodotti giusti.",
  "hero.cta": "Ottieni la mia routine",
  "hero.micro": "1 foto · 2 min · valutata dagli esperti di Seul",
  "trust.reviews": "1.200+ recensioni",
  "team.eyebrow": "I NOSTRI ESPERTI",
  "team.titleA": "Creata da esperti",
  "team.titleB": "coreani di skincare",
  "team.body": "Un team di esperti coreani di skincare — inclusa Sumin — analizza la tua pelle e crea una routine su misura per te.",
  "team.statSkinsLabel": "pelli analizzate",
  "team.statNatsLabel": "nazionalità",
  "team.more": "Scopri di più",
  "wyg.eyebrow": "COSA OTTIENI",
  "results.eyebrow": "RISULTATI VERI",
  "results.titleA": "Una pelle davvero",
  "results.titleB": "trasformata",
  "results.body": "Clienti veri, routine vere — prima e dopo il loro piano 8mirrors.",
  "full.eyebrow": "IL TUO PIANO SU MISURA",
  "full.titleA": "Tutto, in un unico",
  "full.titleB": "piano personalizzato",
  "full.body": "La tua routine su misura e i consigli per la pelle, riuniti in un piano chiaro — direttamente nella tua email.",
  "offer.eyebrow": "LA TUA ROUTINE SU MISURA",
  "offer.titleA": "La tua routine su misura,",
  "offer.titleB": "creata dagli esperti",
  "offer.save": "60% DI SCONTO · RISPARMIA $15",
  "offer.inc1": "Un'analisi completa della tua pelle",
  "offer.inc2": "Routine giorno & notte personalizzata",
  "offer.inc3": "2 settimane di coaching esperto",
  "offer.inc4": "Prodotti K-beauty spediti da Seul",
  "offer.privacyA": "Inizia con una foto — noi",
  "offer.privacyB": "sfochiamo i tuoi occhi",
  "offer.privacyC": ", e la tua foto non viene mai condivisa né venduta.",
  "coach.label": "I TUOI ESPERTI 8MIRRORS",
  "bar.delivery": "Consegna in 4–5 giorni",
  "bar.how": "Come funziona",
  "bar.cta": "Provalo gratis",
};

const TR: Dict = {
  "hero.titleA": "Gerçekten işe yarayan",
  "hero.titleB": "cilt rutini",
  "hero.sub": "Cilt bakımı herkese aynı gelmez. Uzmanlarımız cildinizi analiz eder ve doğru ürünlerle eşleştirir.",
  "hero.cta": "Rutinimi al",
  "hero.micro": "1 fotoğraf · 2 dakika · Seul uzmanlarınca incelenir",
  "trust.reviews": "1.200+ yorum",
  "team.eyebrow": "UZMANLARIMIZLA TANIŞIN",
  "team.titleA": "Koreli cilt bakım",
  "team.titleB": "uzmanlarınca tasarlandı",
  "team.body": "Sumin dahil Koreli cilt bakım uzmanlarından oluşan ekip, cildinizi analiz eder ve size özel bir rutin tasarlar.",
  "team.statSkinsLabel": "cilt analiz edildi",
  "team.statNatsLabel": "milliyet",
  "team.more": "Hakkımızda",
  "wyg.eyebrow": "NE ELDE EDERSİNİZ",
  "results.eyebrow": "GERÇEK SONUÇLAR",
  "results.titleA": "Gerçekten değişen",
  "results.titleB": "bir cilt",
  "results.body": "Gerçek müşteriler, gerçek rutinler — 8mirrors planından önce ve sonra.",
  "full.eyebrow": "SİZE ÖZEL PLAN",
  "full.titleA": "Hepsi, tek bir",
  "full.titleB": "kişisel planda",
  "full.body": "Size özel rutininiz ve cilt rehberiniz tek bir net planda — doğrudan e-postanıza.",
  "offer.eyebrow": "SİZE ÖZEL RUTİN",
  "offer.titleA": "Size özel rutininiz,",
  "offer.titleB": "uzmanlarca hazırlandı",
  "offer.save": "%60 İNDİRİM · $15 TASARRUF",
  "offer.inc1": "Cildinizin tam analizi",
  "offer.inc2": "Size özel sabah & akşam rutini",
  "offer.inc3": "2 hafta uzman koçluğu",
  "offer.inc4": "Seul'den gönderilen K-beauty ürünleri",
  "offer.privacyA": "Tek bir fotoğrafla başlar —",
  "offer.privacyB": "gözlerinizi otomatik bulanıklaştırırız",
  "offer.privacyC": ", ve fotoğrafınız asla paylaşılmaz veya satılmaz.",
  "coach.label": "8MIRRORS UZMANLARINIZ",
  "bar.delivery": "4–5 günde teslimat",
  "bar.how": "Nasıl çalışır",
  "bar.cta": "Ücretsiz dene",
};

const ID: Dict = {
  "hero.titleA": "Dapatkan rutinitas perawatan yang",
  "hero.titleB": "benar-benar berhasil",
  "hero.sub": "Perawatan kulit tidak satu untuk semua. Ahli kami menganalisis kulit Anda dan mencocokkannya dengan produk yang tepat.",
  "hero.cta": "Dapatkan rutinitas saya",
  "hero.micro": "1 foto · 2 menit · diperiksa ahli Seoul",
  "trust.reviews": "1.200+ ulasan",
  "team.eyebrow": "KENALI AHLI KAMI",
  "team.titleA": "Dirancang oleh ahli",
  "team.titleB": "perawatan kulit Korea",
  "team.body": "Tim ahli perawatan kulit Korea — termasuk Sumin — menganalisis kulit Anda dan merancang rutinitas khusus untuk Anda.",
  "team.statSkinsLabel": "kulit dianalisis",
  "team.statNatsLabel": "kebangsaan",
  "team.more": "Selengkapnya",
  "wyg.eyebrow": "YANG ANDA DAPATKAN",
  "results.eyebrow": "HASIL NYATA",
  "results.titleA": "Kulit yang benar-benar",
  "results.titleB": "berubah",
  "results.body": "Pelanggan nyata, rutinitas nyata — sebelum & sesudah mengikuti rencana 8mirrors mereka.",
  "full.eyebrow": "RENCANA KHUSUS ANDA",
  "full.titleA": "Semuanya, dalam satu",
  "full.titleB": "rencana personal",
  "full.body": "Rutinitas khusus dan panduan kulit Anda, disatukan dalam satu rencana yang jelas — langsung ke email Anda.",
  "offer.eyebrow": "RUTINITAS KHUSUS ANDA",
  "offer.titleA": "Rutinitas khusus Anda,",
  "offer.titleB": "dibuat oleh ahli",
  "offer.save": "DISKON 60% · HEMAT $15",
  "offer.inc1": "Analisis lengkap kulit Anda",
  "offer.inc2": "Rutinitas pagi & malam khusus",
  "offer.inc3": "2 minggu pendampingan ahli",
  "offer.inc4": "Produk K-beauty dikirim dari Seoul",
  "offer.privacyA": "Mulai dengan satu foto — kami",
  "offer.privacyB": "menyamarkan mata Anda",
  "offer.privacyC": ", dan foto Anda tidak pernah dibagikan atau dijual.",
  "coach.label": "AHLI 8MIRRORS ANDA",
  "bar.delivery": "Pengiriman 4–5 hari",
  "bar.how": "Cara kerjanya",
  "bar.cta": "Coba gratis",
};

const STRINGS: Record<Locale, Dict> = { en: EN, fr: FR, es: ES, it: IT, tr: TR, id: ID };

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void; t: (k: string) => string }>({
  locale: "en",
  setLocale: () => {},
  t: (k) => EN[k] ?? k,
});

export function LocaleProvider({
  children,
  overrides,
}: {
  children: React.ReactNode;
  /** Per-variant copy overrides (key → text). Marketer edits these in a variant
   *  config — no React. An override wins over every locale's dictionary. */
  overrides?: Record<string, string>;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const saved = localStorage.getItem("8m-locale") as Locale | null;
    if (saved && STRINGS[saved]) setLocale(saved);
  }, []);
  const set = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("8m-locale", l);
  };
  const t = (k: string) => overrides?.[k] ?? STRINGS[locale][k] ?? EN[k] ?? k;
  return <Ctx.Provider value={{ locale, setLocale: set, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}
