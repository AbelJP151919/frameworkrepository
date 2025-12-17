const About = () => {
  return (
    <div>
      <h1>Sobre CineFlask</h1>
      <div className="row">
        <div className="col-md-8">
          <p className="lead">
            CineFlask es un proyecto desarrollado como parte del módulo de Frameworks en el ciclo formativo
            de Desarrollo de Aplicaciones Web (DAW2).
          </p>
          <p>
            Esta aplicación permite gestionar un catálogo de películas, añadir nuevas películas,
            ver detalles de cada una y mantener una base de datos organizada.
          </p>
          <h3>Tecnologías utilizadas</h3>
          <ul>
            <li><strong>Backend:</strong> Flask (Python)</li>
            <li><strong>Base de datos:</strong> SQLite</li>
            <li><strong>Frontend:</strong> React</li>
            <li><strong>Estilos:</strong> Bootstrap 5</li>
            <li><strong>Routing:</strong> React Router</li>
          </ul>
          <h3>Características</h3>
          <ul>
            <li>Catálogo completo de películas</li>
            <li>Información detallada de cada película</li>
            <li>Formulario para añadir nuevas películas</li>
            <li>Interfaz responsive y moderna</li>
            <li>API REST para comunicación frontend-backend</li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-code fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Proyecto DAW2</h5>
              <p className="card-text">Frameworks - Desarrollo de Aplicaciones Web</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
