//Copyright 2022 Matt Ellen Atmosphere Software License Version 0.4–🚪🌳🛂💸

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
        
        return true;
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
    if(el.tagname === 'RJSF-IF')
    {
      this.rjsfif(el, property)
    }
    else
    {
      el.textContent = this.data[property];
    }
  };

  AppBuilder.prototype.rjsfif = function(el, prop)
  {
    if(this.data[property])
    {
      el.style='display:none;';
    }
    else
    {
      el.style='display:inherit;';
    }
  };

  return AppBuilder;
    
})();
