import {rjsf} from '../rjsf.js'

(function()
{
  const appElement = document.getElementById('app');

  const app = new rjsf(appElement);

  const viewmodel = 
        {
          data:
          {
            message: 'hello world',
          }
        };

  app.init(viewmodel);
})();
