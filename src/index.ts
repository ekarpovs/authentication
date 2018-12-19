import app from './app';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(
    `App is running at ${app.get('uri')}:${app.get('port')} in ${app.get('env')}`
  );
  // tslint:disable-next-line:no-console
  console.log('  Press CTRL-C to stop\n');
});

export default server;
