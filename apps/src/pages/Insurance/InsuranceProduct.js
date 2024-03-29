import { useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import InsurancePage from "./InsurancePage";
import style from "./InsurancePage.module.scss";

export default function InsuranceProduct() {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = (params) => {
    if (isOpen !== params) setOpen(params);
    else setOpen(false);
  };

  const headStyle = "font-bold mb-5";
  const listStyle = "list-disc [&>*]:leading-normal [&>*]:mb-4";

  return (
    <InsurancePage>
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
            dipertanggungkan. Program ini adalah kerjasama antara Otto dan
            Equity Life Indonesia.
          </div>
          <div className="mb-10">
            <Accordion
              title="Manfaat Asuransi"
              isOpen={isOpen === "manfaat"}
              onClick={() => toggleOpen("manfaat")}
            >
              <div className="body-text text-justify">
                Jika Tertanggung untuk pertama kalinya didiagnosis salah satu
                penyakit kritis yang dipertanggungkan dalam Sertifikat Asuransi
                dan terjadi dalam Masa Asuransi, maka Penanggung akan memberikan
                Manfaat Asuransi sebesar 100% Uang Pertanggungan dan selanjutnya
                Kepesertaan Asuransi berakhir. Jenis penyakit kritis yang
                dipertanggungkan sebagai berikut: stroke, kanker dan serangan
                jantung.
              </div>
            </Accordion>
            <Accordion
              title="Syarat Ketentuan"
              isOpen={isOpen === "syarat"}
              onClick={() => toggleOpen("syarat")}
            >
              <div className="body-text text-justify">
                <div className={headStyle}>
                  Berikut adalah Syarat dan Ketentuan yang harus diperhatikan
                  bagi Tertanggung jika hendak membeli produk My CI Protection:
                </div>
                <ul className={listStyle}>
                  <li>Anda berusia 17-59 tahun</li>
                  <li>Masa asuransi Anda adalah 1 bulan</li>
                  <li>Uang pertanggungan Anda adalah Rp1.000.000</li>
                  <li>
                    Anda hanya dapat memiliki maksimum 3 (tiga) Sertifikat
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
                    Dengan memperhatikan ketentuan maksimum akumulasi Uang
                    Pertanggungan yang berlaku, klaim atas nama Anda terhadap
                    produk asuransi ini hanya dapat dilakukan 1 (satu) kali
                    selama periode asuransi. Mohon abaikan penawaran selanjutnya
                    jika Anda sudah pernah mendapatkan/mengajukan pembayaran
                    Manfaat Asuransi terkait produk ini sebelumnya.
                  </li>
                  <li>
                    Manfaat Asuransi tidak akan dibayarkan untuk setiap
                    peristiwa yang disebabkan karena atau menjadi akibat dari
                    keadaan/penyakit yang telah ada sebelum tanggal berlakunya
                    asuransi (Pre-Existing Condition).
                  </li>
                </ul>
              </div>
            </Accordion>
            <Accordion
              title="Cara Klaim"
              isOpen={isOpen === "klaim"}
              onClick={() => toggleOpen("klaim")}
            >
              <div className="body-text text-justify">
                <div className={headStyle}>
                  Berikut adalah Tata Cara Klaim yang harus diperhatikan bagi
                  Tertanggung jika hendak mengajukan klaim produk My CI
                  Protection:
                </div>
                <ul className={listStyle}>
                  <li>
                    Lengkapi persyaratan dan dokumen klaim yang tercantum pada
                    dokumen klaim di bawah ini atau dapat menghubungi Contact
                    Center kami di 1500 079 (Senin – Jumat, Pukul 08.30–17.00)
                    maupun via website Equity Life Indonesia (www.equity.co.id).
                  </li>
                  <li>
                    Pastikan Anda memberikan formulir dan dokumen klaim secara
                    lengkap dan benar.
                  </li>
                  <li>
                    Pengajuan klaim harus disampaikan selambat lambatnya 60
                    (enam puluh) hari kalender sejak Anda didiagnosis menderita
                    salah satu dari 3 (tiga) penyakit kritis yang
                    dipertanggungkan dengan melampirkan:
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
                    hari kerja setelah dokumen klaim lengkap diterima oleh PT
                    Equity Life Indonesia
                  </li>
                </ul>
              </div>
            </Accordion>
          </div>
          <div className="body-text">
            Untuk informasi lebih lanjut terkait dengan produk My CI Protection,
            Tertanggung dapat menghubungi Contact Center di 1500 079 di hari
            Senin – Jumat pukul 08.30 – 17.00 atau email ke
            contact.center@equity.id atau kunjungi website PT Equity Life
            Indonesia di www.equity.co.id
          </div>
        </div>
      </div>
    </InsurancePage>
  );
}
