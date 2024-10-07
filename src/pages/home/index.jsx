import { Link } from "react-router-dom";
import CrayonAlumnos from "../../assets/images/img/crayon-alumnos.jpg";
import LogoCrayons from "../../assets/images/logo/logo-crayon.png";

const HomePage = () => {
  return (
    <section>
      <header className="header_home">
        <img className="logo_home" src={LogoCrayons} alt="" />
        <nav>
          <ul>
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="">Nostros</a>
            </li>
            <li>
              <a href="">Visión y Misión</a>
            </li>
            <li>
              <Link to="/login">Aula</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main_home">
        <section className="hero">
          <div>
            <h1 className="title_colegio">COLEGIO CRAYON'S - SATIPO</h1>
            <p className="slogan">
              Educando para el futuro con creatividad y pasión
            </p>
          </div>
          <img className="img_alumnos" src={CrayonAlumnos} alt="" />
        </section>
        <section className="">
          <h2 className="title_mision_vision">Misión y Visión</h2>
          <section className="container_mision_vision">
            <div>
              <h2 className="title_mision_vision ">Misión</h2>
              <p className="mision_text">
                Somos una Institución Educativa Privada que brinda una educación
                integral a través de los Compromisos de Gestión Escolar, basada
                en valores éticos, morales y cívicos, desarrollando y
                potenciando sus competencias y capacidades de los estudiantes
                hacia los niveles esperados según su grado, ciclo y nivel en el
                marco del CNEB puedan culminar la escolaridad de manera
                satisfactoria, orientados hacia la excelencia y alcanzando su
                desarrollo integral en espacios seguros, inclusivos, de sana
                convivencia y libres de violencia, afianzando permanentemente
                sus aprendizajes basados en los fines y principios de la
                Educación Peruana.
              </p>
            </div>
            <div>
              <h2 className="title_mision_vision ">Visión</h2>
              <p className="vision_text">
                Ser reconocidos en nuestra localidad al año 2026, como una
                Institución Educativa Privada que contribuye a que todos sus
                estudiantes puedan desarrollar su potencial desde la primera
                infancia, sean ciudadanos capaces de resolver con éxito los
                problemas que se les presente, asumiendo una actitud activa,
                crítica, analítica y responsable frente a los hechos de su
                entorno, practicando los valores basados en los principios de la
                Educación Peruana, autoevaluándose y evaluando a los demás para
                seguir aprendiendo, asumiéndose como ciudadanos con derechos y
                responsabilidades. Contribuyendo así al desarrollo de su
                comunidad y del país, combinando su capital cultural y natural
                con los avances mundiales en concordancia en el marco de los
                once aspectos del perfil de egreso del CNEB.
              </p>
            </div>
          </section>
        </section>
        <section>
          <h2 className="title_mision_vision">Formación Completa</h2>
          <section className="niveles">
            <div className="container_nivel">
              <h4 className="title_nivel">Inicial</h4>
              <p className="niveles_text">
                En el nivel Inicial, fomentamos la curiosidad natural de los
                niños, brindándoles un ambiente seguro y estimulante para
                aprender a través del juego y la exploración.
              </p>
            </div>
            <div className="container_nivel">
              <h4 className="title_nivel">Primaria</h4>
              <p className="niveles_text">
                Durante la Primaria, desarrollamos habilidades fundamentales en
                lectura, escritura y matemáticas, mientras cultivamos valores
                como la responsabilidad, el respeto y la cooperación.
              </p>
            </div>
            <div className="container_nivel">
              <h4 className="title_nivel">Secundaria</h4>
              <p className="niveles_text">
                En la Secundaria, preparamos a los estudiantes para los desafíos
                académicos futuros, promoviendo el pensamiento crítico, la
                creatividad y el desarrollo de una sólida base académica.
              </p>
            </div>
          </section>
        </section>
      </main>
      <footer className="footer_home"></footer>
    </section>
  );
};

export default HomePage;
