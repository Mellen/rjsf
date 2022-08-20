export const rjsf = (function()
{
  function AppBuilder(baseElement)
  {
    this.base = baseElement;
  }

  AppBuilder.prototype.init = function(viewmodel)
  {
    const elements = this.base.getElementsByTagName('*');
  
    this.originalViewmodel = viewmodel;
    
    this.elements = {};
    
    const _internal = this;
    
    this.data = new Proxy({}, 
    {
      get(target, name, receiver) 
      {
        if (!(name in _internal.originalViewmodel.data))
        {
          return undefined;
        }

        return _internal.originalViewmodel.data[name];
      },
      
      set(target, name, value, receiver) 
      {
        if (!(name in _internal.originalViewmodel.data))
        {
          console.warn(`Setting non-existent property '${name}', initial value: ${value}`);
        }

        _internal.originalViewmodel.data[name] = value;
        
        for(let el of _internal.elements[name])
        {
      	  _internal.updateElement(el);
        }     
        
        return _internal.originalViewmodel.data[name];
      }
    });
    
    for(let el of elements)
    {
      if('model' in el.dataset)
      {
        if(el.dataset.model in this.elements)
        {
    	  this.elements[el.dataset.model].push(el);
        }
        else
        {
      	  this.elements[el.dataset.model] = [el];
        }
        
        this.updateElement(el);
      }
      
      if(el.getAttribute('onclick'))
      {
    	let onclick = el.getAttribute('onclick');
        el.setAttribute('onclick', '');
    	if(onclick in _internal.originalViewmodel.functions)
        {
          el.addEventListener('click', _internal.originalViewmodel.functions[onclick].bind(_internal));
        }
      }
    }

    this.originalViewmodel.finishedInit.bind(_internal)();
  };

  AppBuilder.prototype.updateElement = function(el)
  {
    const property = el.dataset.model;
    el.textContent = this.data[property];
  };

  return AppBuilder;
    
})();
