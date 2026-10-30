export type ProjectStatus = "completed" | "prototype" | "in-progress" | "competition-entry";

export interface PortfolioProject {
  slug: string;
  title: string;
  summary: string;
  role: string;
  status: ProjectStatus;
  technologies: string[];
  problem?: string;
  solution?: string;
  contributions: string[];
  verification: "verified" | "needs_confirmation";
}

export const projects: PortfolioProject[] = [
  {
    slug: "pintarajar",
    title: "PintarAjar — Platform Asisten AI untuk Guru",
    summary: "Platform asisten AI berbasis RAG yang membantu guru menyusun modul ajar, soal evaluasi, dan strategi pembelajaran yang adaptif terhadap kebutuhan siswa.",
    role: "Ketua Tim",
    status: "competition-entry",
    technologies: ["Kecerdasan Buatan", "RAG"],
    problem: "Guru perlu bantuan menyusun modul ajar dan soal evaluasi yang adaptif.",
    solution: "Platform asisten AI berbasis Retrieval-Augmented Generation.",
    contributions: ["Ketua Tim — detail fitur yang dikerjakan masih menunggu verifikasi pemilik."],
    verification: "needs_confirmation",
  },
  {
    slug: "warungkas",
    title: "WarungKas — Aplikasi Kasir Warung Madura",
    summary: "Aplikasi kasir untuk warung Madura 24 jam: transaksi cepat, penjualan eceran multi-satuan, pengelolaan shift penjaga, dan Buku Bon Digital. Berbasis PWA dan offline-first.",
    role: "Product Owner & Developer",
    status: "in-progress",
    technologies: ["PWA", "JavaScript", "IndexedDB"],
    problem: "Warung 24 jam butuh transaksi cepat, multi-satuan, shift penjaga, dan pencatatan bon.",
    solution: "POS PWA offline-first dengan Buku Bon Digital.",
    contributions: ["Product Owner & Developer", "Repo publik BeeBeeCuy/warungkas, Tahap 6"],
    verification: "verified",
  },
  {
    slug: "cafe-northern",
    title: "Sistem Manajemen Café Northern",
    summary: "Sistem informasi untuk pengelolaan operasional Café Northern di Yogyakarta, sebagai proyek akademik lengkap: proposal, MOU, perancangan UML, pengujian sistem termasuk kuesioner SUS, dan modul pelatihan admin dan pegawai.",
    role: "Project Manager",
    status: "completed",
    technologies: [],
    problem: "Operasional kafe masih terpisah antara POS, stok, dan laporan.",
    solution: "Sistem manajemen kafe terintegrasi.",
    contributions: ["Project Manager — teknologi masih menunggu verifikasi pemilik."],
    verification: "needs_confirmation",
  },
  {
    slug: "inventaris",
    title: "Sistem Inventaris Barang Universitas Sunan Bonang",
    summary: "Sistem untuk mendukung pengelolaan dan pencatatan inventaris barang di Universitas Sunan Bonang, Tuban.",
    role: "Full Stack Developer",
    status: "completed",
    technologies: ["Laravel", "MySQL"],
    problem: "Pengelolaan dan pencatatan inventaris barang kampus.",
    solution: "Sistem inventaris barang.",
    contributions: ["Full Stack Developer — detail fitur masih menunggu verifikasi pemilik."],
    verification: "needs_confirmation",
  },
];
