import { useState } from "react";
import style from "./InsuranceProduct.module.scss";
import { Accordion, LinkNewTab } from "components";
import { isAppleDevice } from "helpers/util";
import eliContact from "helpers/eli-contact";

export default function InsuranceCI() {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = (params) => {
    if (isOpen !== params) setOpen(params);
    else setOpen(false);
  };

  const listStyle =
    "list-disc [&>li]:leading-normal [&>li]:mb-3 [&>li]:ml-[2em]";
  const description = `${style.description} body-text`;
  const headStyle = style.heading;
  const linkEquity = `${isAppleDevice() ? "web:" : ""}${eliContact.site}`;

  return (
    <div>
      <div className={style.banner}>
        <img
          alt="Banner Critical Illness"
          src="/assets/banner-critical-illness.jpg"
        />
      </div>
      <div className={style.productWord}>
        <div className={style.productTitle}>
          My CI (Critical Illness) Protection
        </div>
        <div className="body-text mb-5">
          Produk asuransi yang memberikan manfaat perlindungan terhadap salah
          satu dari 3 (tiga) jenis Penyakit Kritis yang dipertanggungkan. Produk
          Critical Illness ini adalah produk yang dipasang pada transaksi QRIS.
        </div>
        <div className="mb-10">
          <Accordion
            title="Manfaat Asuransi"
            isOpen={isOpen === "manfaat"}
            onClick={() => toggleOpen("manfaat")}
          >
            <div className={description}>
              Jika Tertanggung untuk pertama kalinya didiagnosis salah satu dari
              3 (tiga) penyakit kritis yang dipertanggungkan dalam Sertifikat
              Asuransi dan terjadi dalam Masa Asuransi, maka Penanggung akan
              memberikan Manfaat Asuransi sebesar 100% Uang Pertanggungan dan
              selanjutnya Kepesertaan Asuransi berakhir. Jenis penyakit kritis
              yang dipertanggungkan sebagai berikut: stroke, kanker dan serangan
              jantung.
            </div>
          </Accordion>
          <Accordion
            title="Syarat Ketentuan"
            isOpen={isOpen === "syarat"}
            onClick={() => toggleOpen("syarat")}
          >
            <div className={description}>
              <div className={headStyle}>
                Berikut adalah Syarat dan Ketentuan yang harus diperhatikan bagi
                Tertanggung jika hendak mengikuti Program My CI Protection:
              </div>
              <ul className={listStyle}>
                <li>Anda berusia 17-59 tahun</li>
                <li>Masa asuransi Anda adalah 1 bulan</li>
                <li>Uang pertanggungan Anda adalah Rp1.000.000</li>
                <li>
                  Anda hanya dapat memiliki maksimum{" "}
                  <span className="font-semibold">3 (tiga)</span> Sertifikat
                  Asuransi dalam 1 periode yang beririsan dengan maksimal
                  akumulasi Uang Pertanggungan yang dapat dibayarkan per
                  Tertanggung sebesar Rp3.000.000 (tiga juta rupiah)
                </li>
                <li>
                  Anda dapat terlindungi kembali apabila melakukan pembelian
                  setelah berakhirnya masa perlindungan sebelumnya dan belum
                  pernah mengajukan klaim manfaat ini
                </li>
                <li>
                  Dengan memperhatikan ketentuan{" "}
                  <span className="font-semibold">maksimum</span> akumulasi Uang
                  Pertanggungan yang berlaku, klaim atas nama Anda terhadap
                  produk asuransi ini hanya dapat dilakukan 1 (satu) kali selama
                  periode asuransi. Mohon abaikan penawaran selanjutnya jika
                  Anda sudah pernah mendapatkan/mengajukan pembayaran Manfaat
                  Asuransi terkait produk ini sebelumnya.
                </li>
                <li>
                  Manfaat Asuransi tidak akan dibayarkan untuk{" "}
                  <span className="font-semibold">setiap</span>&nbsp; peristiwa
                  yang disebabkan karena atau menjadi akibat dari
                  keadaan/penyakit yang telah ada sebelum tanggal berlakunya
                  asuransi{" "}
                  <span className="italic">(Pre-Existing Condition)</span>.
                </li>
              </ul>
            </div>
          </Accordion>
          <Accordion
            title="Cara Klaim"
            isOpen={isOpen === "klaim"}
            onClick={() => toggleOpen("klaim")}
          >
            <div className={description}>
              <div className={headStyle}>
                Berikut adalah Tata Cara Klaim yang harus diperhatikan bagi
                Tertanggung jika hendak mengajukan klaim Program My CI
                Protection:
              </div>
              <ul className={listStyle}>
                <li>
                  Lengkapi persyaratan dan dokumen klaim yang tercantum pada
                  dokumen klaim di bawah ini atau dapat menghubungi Contact
                  Center kami di 1500 079 (Senin – Jumat, Pukul 08.30–17.00)
                  maupun via website Equity Life Indonesia{" "}
                  <LinkNewTab href={linkEquity}>(www.equity.co.id)</LinkNewTab>.
                </li>
                <li>
                  Pastikan Anda memberikan formulir dan dokumen klaim secara
                  lengkap dan benar.
                </li>
                <li>
                  Pengajuan klaim harus disampaikan selambat lambatnya 60 (enam
                  puluh) hari kalender sejak Anda didiagnosis menderita salah
                  satu dari 3 (tiga) penyakit kritis yang dipertanggungkan
                  dengan melampirkan:
                </li>
                <li>Fotokopi identitas diri (eKTP/Paspor) Tertanggung.</li>
                <li>
                  Mengisi formulir pengajuan pembayaran Manfaat Asuransi yang
                  disediakan oleh Penanggung dengan lengkap dan jelas.
                </li>
                <li>
                  Formulir perawatan medis/resume medis/keterangan dari dokter
                  tentang penyakit kritis yang dijamin oleh Penanggung
                  berdasarkan Polis.
                </li>
                <li>Sertifikat Asuransi.</li>
                <li>
                  Melampirkan keterangan-keterangan atau dokumen-dokumen lain
                  yang dianggap perlu oleh Penanggung, sehubungan dengan
                  analisis klaim tersebut.
                </li>
                <li>
                  Pembayaran klaim akan ditransfer maksimal 14 (empat belas)
                  hari kerja setelah dokumen klaim diterima secara lengkap dan
                  disetujui oleh PT. Equity Life
                </li>
              </ul>
            </div>
          </Accordion>
        </div>
        <div className="body-text">
          Untuk informasi lebih lanjut terkait dengan produk My CI Protection,
          Tertanggung dapat menghubungi Contact Center di 1500 079 di hari Senin
          – Jumat pukul 08.30 – 17.00 atau email ke{" "}
          <a href={`mailto:${eliContact.mail}`} className="hover:underline">
            {eliContact.mail}
          </a>{" "}
          atau kunjungi website PT Equity Life Indonesia di{" "}
          <LinkNewTab href={linkEquity}>{eliContact.siteText}</LinkNewTab>
        </div>
      </div>
    </div>
  );
}
