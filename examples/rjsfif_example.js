import {rjsf} from '../rjsf.js'

(function()
{
  const appElement = document.getElementById('app');

  const app = new rjsf(appElement);

  const viewmodel = 
        {
          functions:
          {
            toggleShowThing: function(e)
            {
              e.preventDefault();
              this.data.showThing = !this.data.showThing;              
            }
          },
          data:
          {
            showThing: true,
          }
        };

  app.init(viewmodel);

})();
