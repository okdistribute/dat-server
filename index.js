module.exports = function (config) {
  return `
  <html>
    <head>
      <title>${config.title}</title>
      <link type="image/png" rel="icon" href="/static/dat-data-blank.png" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="/static/style.css" rel="stylesheet" />
    </head>
    <body>
      <nav>
        <div class="nav-wrapper container">
          <ul class="left">
            <li><a href="/"><h4 id="title">${config.title}</h4></a></li>
          </ul>
          <ul id="nav-mobile" class="right">
            <!--<li><a href="/api/settings"><i class="material-icons">settings</i></a></li>-->
            <li><a href="http://github.com/karissa/dat-server"><i class="material-icons">info</i></a></li>
          </ul>
        </div>
      </nav>
      <div id="status">
      </div>


      <main class="container">
        <div class="section list-item" id="header">
          <input type="text" placeholder="Link" id="link" />
          <a class="btn" type="submit" id="submit">Host</a>
        </div>
        <div class="section">
          <div class="row centered"><div id="loading" style="display: none;"><img src="/static/loading_icon_small.gif" /></div></div>
          <div id="app">
          </div>
        </div>
      </main>
      <script src="/static/bundle.js"></script>
      <script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    </body>
  </html>
  `
}
