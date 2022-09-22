import style from "./InsuranceDetail.module.scss";

export default function InsuranceProduct() {
  return (
    <div>
      <div className={style.banner}>
        <img
          alt="Banner Critical Illness"
          src="/assets/banner-critical-illness.jpg"
        />
      </div>
      <div className={style.productWord}>
        <div
          className={`${style.productTitle} font-semibold text-ottoBlue-300`}
        >
          My CI (Critical Illness) Protection
        </div>
        <div className="body-text mb-5">
          Produk Asuransi yang dipasarkan adalah Asuransi Penyakit Kritis
          kumpulan, yaitu produk Asuransi yang memberikan manfaat perlindungan
          terhadap salah satu dari 3 (tiga) jenis penyakit kritis yang
          dipertanggungkan. Program ini adalah kerjasama antara Otto dan Equity
          Life Indonesia.
        </div>
        <div className="body-text">
          Untuk informasi lebih lanjut terkait dengan produk My CI Protection,
          Tertanggung dapat menghubungi Contact Center di 1500 079 di hari Senin
          – Jumat pukul 08.30 – 17.00 atau email ke contact.center@equity.id
          atau kunjungi website PT Equity Life Indonesia di www.equity.co.id{" "}
        </div>
      </div>
    </div>
  );
}
