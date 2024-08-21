import "../../styles/ImagenFondo.css";
export const ImagenFondo = () => {
  return (
    <div className="imagen-fondo">
      <div className="cuadro-texto">
        <h2>Menú</h2>
        <p>
          ¡No hay nada más sabroso que una Cangreburguer bien cocida bajo el sol
          de fondo de Bikini!
        </p>
        <input type='text' placeholder='Buscar productos...' className='barra' />
      </div>
    </div>
  );
};
