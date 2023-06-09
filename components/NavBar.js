import styles from "../styles/Home.module.css";

export default function NavBar(props) {
    return (
        <div className={styles.rowNoMarginNoPadding} style={{marginBottom: 88}}>
            <div className={styles.navbarTitleContainer}>
                <img src="/favicon.png" alt="Icon" width={40} height={40}/>
                <h1 className={styles.navbarTitle}>EasyDCA</h1>
            </div>
        </div>
    );
}
