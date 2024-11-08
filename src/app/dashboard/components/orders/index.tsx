import { RefreshCcw } from "lucide-react";
import styles from "./styles.module.scss";

export function Orders() {
  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>Ultimos pediods</h1>
        <button>
          <RefreshCcw size={24} color="#3fffa3" />
        </button>
      </section>

      <section className={styles.listOrders}>
        <button className={styles.orderItem}>
            <div className={styles.tag}></div>
            <span>Mesa 10</span>

        </button>
      </section>
    </main>
  );
}
