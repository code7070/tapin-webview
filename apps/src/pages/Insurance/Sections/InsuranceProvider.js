export default function InsuranceProvider() {
  return (
    <div className="px-5">
      <div className="info-text">
        *Produk dan jasa keuangan formal ditawarkan oleh lembaga jasa keuangan
        formal yang memiliki izin, diatur, dan diawasi oleh Otoritas Jasa
        Keuangan (OJK).
      </div>
      <div className="inline-block w-[84px]">
        <div className="body-text small font-semibold mb-5">Penyedia</div>
        <div className="logo-cermati">
          <img
            alt="Cermati Logo"
            src="/assets/cermati-logo.jpg"
            className="w-full"
          />
        </div>
        <div className="text-xs mt-2">PT Fokus Solusi Proteksi</div>
      </div>
    </div>
  );
}
