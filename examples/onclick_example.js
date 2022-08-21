import {rjsf} from '../rjsf.js'

(function()
{
  const appElement = document.getElementById('app');

  const app = new rjsf(appElement);

  const viewmodel = 
        {
          functions:
          {
            changeMessage: function(e)
            {
              e.preventDefault();
              const v = this;
              v.data.message = 'Now this message is.';
              setTimeout(() => v.data.message = 'This message is here.', 1000);
            }
          },
          data:
          {
            message: 'This message is here.',
          }
        };

  app.init(viewmodel);

})();
