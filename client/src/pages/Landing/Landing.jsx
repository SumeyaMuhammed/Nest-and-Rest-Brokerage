import Layout from "../../components/Layout/Layout"
import classes from "./landing.module.css"
const Landing = () => {
  return (
    <Layout>
    <div className={classes.overlay}></div>
    <main>
        <div className={classes.hero}>
          <h1>YOUR TRUSTED BROKER FOR HOUSES AND CARS</h1>
          <p>Delivering excellence through personalized solutions and unmatched expertise.</p>
            <button>Log In</button>
        </div>

        <section className={classes.stats}>
            <div className={classes.stat}>
              <h2>$200 B+</h2>
              <p>Monthly Volume</p>
            </div>
            <div className={classes.stat}>
              <h2>200+</h2>
              <p>Brokers</p>
            </div>
            <div className={classes.stat}>
              <h2>65 K</h2>
              <p>Traders</p>
            </div>
            <div className={classes.stat}>
              <h2>75</h2>
              <p>Partners</p>
            </div>
        </section>
    </main>
    </Layout>
  )
}

export default Landing