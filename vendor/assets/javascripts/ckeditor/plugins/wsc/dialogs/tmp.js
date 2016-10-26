
(function(window) {
  // Constructor Manager PostMessage

  var ManagerPostMessage = function() {
  	var _init = function(handler) {
  		if (document.addEventListener) {
  			window.addEventListener('message', handler, false);
  		} else {
  			window.attachEvent("onmessage", handler);
  		};
  	};
  	var _sendCmd = function(o) {
  		var str,
  			type = Object.prototype.toString,
  			fn = o.fn || null,
  			id = o.id || '',
  			target = o.target || window,
  			message = o.message || { 'id': id };

  		if (type.call(o.message) == "[object Object]") {
  			(o.message['id']) ? o.message['id'] : o.message['id'] = id;
  			message = o.message;
  		};

  		str = JSON.stringify(message, fn);
  		target.postMessage(str, '*');
  	};

  	return {
  		init: _init,
  		send: _sendCmd
  	};
  };

  var manageMessageTmp = new ManagerPostMessage;


	var appString = (function(){
		var spell = parent.CKEDITOR.config.wsc.DefaultParams.scriptPath;
		var serverUrl = parent.CKEDITOR.config.wsc.DefaultParams.serviceHost;
		return serverUrl + spell;
	})();

	function loadScript(src, callback) {
	    var scriptTag = document.createElement("script");
	   		scriptTag.type = "text/javascript";
	   	callback ? callback : callback = function() {};
	    if(scriptTag.readyState) {
	        //IE
	        scriptTag.onreadystatechange = function() {
	            if (scriptTag.readyState == "loaded" ||
	            scriptTag.readyState == "complete") {
	                scriptTag.onreadystatechange = null;
	                setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1)
	                callback();
	            }
	        };
	    }else{
	        //Others
	        scriptTag.onload = function() {
	           setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);
	           callback();
	        };
	    };
	    scriptTag.src = src;
	    document.getElementsByTagName("head")[0].appendChild(scriptTag);
	};


	window.onload = function(){
		 loadScript(appString, function(){
			manageMessageTmp.send({
				'id': 'iframeOnload',
				'target': window.parent
			});
		});
	}
})(this);
