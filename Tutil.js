var _ckName = 'ylM2Host';
var _ckHost = '';
 // Cookies
        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";

            //var fixedName = '<%= Request["formName"] %>';
			var fixedName = '';
            name = fixedName + name;

            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name, "", -1);
        }
		
		
function showHostInput(){
		var person = prompt("請輸入WebOffice的網址 \n例:http://www.young-long.com.tw/");
		if(person != null){
			chkHost(person);
		}else{
			/*
			alert('請輸入正確的WebOffice網址');
			location.reload();
			*/
			HostErr()
		}
	
}


function HostErr(){
	alert( "找不到這網站的手機板, \n 請輸入正確的WebOffice網址" );
	location.reload();
	
}

function chkHost(hostStr){
	//alert(hostStr);
	//var url = 'http://yuxun.our-program.com.tw/m2/m2.json.php';
	//var url = 'http://www.07-11.com.tw/m2/m2.json.php';
	_ckHost = hostStr;
	var url = hostStr + 'm2/m2.json.php';
		
	
//var jqxhr = $.get( url, function(rsData) {
	
	var jqxhr = $.getJSON( url,{async: false}, function(rsData) {	
	
  //alert( rsData.stst == undefined );
			if(rsData.stat == 'OK'){
				oprnHost();
				createCookie(_ckName,_ckHost);
			}else{
				HostErr()
			}
  
	}).fail(function() {
			HostErr()
		});

	
	
}	


function oprnHost(){
	var myIframe = $('#myFrame'); 
	myIframe.show();
	//.myIframe.prop('src', 'http://www.07-11.com.tw/m2/');
	myIframe.prop('src', _ckHost + 'm2/');
	
}
	
jQuery(document).ready(function () {
	//eraseCookie(_ckName);
	var chk = readCookie(_ckName);
	if(chk == null){
		showHostInput();
	}else{
		//.alert('open');
		_ckHost = chk ;
		oprnHost()
		
		
	}
/*		
$('#myFrame').show();
*/	

});
