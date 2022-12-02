import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Image from "../../components/Image/Image";
import styles from "./Test.module.scss";

const Boxs = ({ title = "Title default", children }) => {
  return (
    <div className="py-4 px-8 max-w-lg mx-auto mb-4 border-2 rounded-lg">
      <h3 className="text-xl mb-4">{title}</h3>
      {children}
    </div>
  );
};

Boxs.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const Test = () => {
  return (
    <div className={styles.testContainer}>
      <h2 className="text-2xl font-bold max-w-lg mx-auto mb-6">OTTO Starter</h2>
      <Boxs title="Pages">
        <ul>
          <li>
            <Link
              className="text-blue-700 mx-2 hover:underline hover:text-blue-500"
              to="/insurance/list"
            >
              Insurance List
            </Link>
            <Link
              className="text-blue-700 mx-2 hover:underline hover:text-blue-500"
              to="/insurance/ci"
            >
              Insurance Detail
            </Link>
            <Link
              className="text-blue-700 mx-2 hover:underline hover:text-blue-500"
              to="/huy"
            >
              Huy - deploy dev
            </Link>
          </li>
        </ul>
      </Boxs>
      <Boxs title="Components">
        <Boxs title="Button">
          <Button>Primary</Button>
          <Button model="secondary">Secondary</Button>
        </Boxs>
        <Boxs title="Header">
          <Header />
        </Boxs>
        <Boxs title=".body-text">
          <div className="body-text">
            Produk Asuransi yang dipasarkan adalah Asuransi Penyakit Kritis
            kumpulan, yaitu produk Asuransi yang memberikan manfaat perlindungan
            terhadap salah satu dari 3 (tiga) jenis penyakit kritis yang
            dipertanggungkan Program ini adalah kerjasama antara Otto dan Equity
            Life Indonesia.
          </div>
        </Boxs>
        <Boxs title=".info-text">
          <div className="info-text">
            *Produk dan jasa keuangan formal ditawarkan oleh lembaga jasa
            keuangan formal yang memiliki izin, diatur, dan diawasi oleh
            Otoritas Jasa Keuangan (OJK).
          </div>
        </Boxs>
        <Boxs title="Image">
          <Image
            className={styles.testImage}
            src="/assets/sample.webp"
            fallback="/assets/sample.jpg"
            alt="This is a sample image"
          />
        </Boxs>
      </Boxs>
    </div>
  );
};

export default Test;
