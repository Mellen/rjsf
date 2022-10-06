import {rjsf} from '../rjsf.js'

(function()
{
  const appElement = document.getElementById('app');

  const app = new rjsf(appElement);

  const viewmodel = 
        {
          functions:
          {
            annoy: function(e)
            {
              e.preventDefault();
              alert('this is annoying isn\'t it?');
            }
          },
        };

  app.init(viewmodel);

})();
