
const FiltradoPrecio = () => {
  return (
    <div style = {styles.container}>
        <button style = {styles.buttonFilter}>20000 a 250000</button>
        <button style = {styles.buttonFilter}>25000 a 300000</button>
        <button style = {styles.buttonFilter}>30000 a 350000</button>
    </div>
  )
}

const styles = {
    buttonFilter: {
        background: 'linear-gradient(to right, #D97B29, #734116)',
        color: '#EBEBEB',
        fontSize: '16px',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 40px',
    },
    container: {
        display: 'flex',
        gap: '50px'
    }
}
export default FiltradoPrecio