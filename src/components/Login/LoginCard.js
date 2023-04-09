import styles from "./LoginCard.module.css"

export default function LoginCard({ title, children }){
    return (
        <div className={styles.card}>
            <h4>{ title }</h4>
            { children }
        </div>
    )
}