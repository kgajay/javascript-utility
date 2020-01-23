AjaxUtil = {
    ajaxFileUploadAction: function(url, type, ajaxData, callback, response_type){
      jQuery.ajax({
        url : url,
        type : type,
        data : ajaxData,
        processData : false,
        contentType : false,
        success : function(transport) {
          if(response_type == 'plain-response') {
            var response = transport;
          }else {
            var response = jQuery.parseJSON(transport);
          }
          ajaxResponse =  {"type": "success", "msg": response};
        },
        error: function(){
          ajaxResponse =  {"type": "failure", "msg": "Some Error Occured"};
        },
        complete: function(){
          if(typeof(callback) !== "undefined"){
            callback(ajaxResponse);
          }
        }
      });
    },

    ajaxAction: function(url, type, ajaxData, callback, response_type){
      jQuery.ajax({
        url : url,
        type : type,
        data : ajaxData,
        success : function(transport) {
          if(response_type == 'plain-response') {
            var response = transport;
          }else {
            var response = jQuery.parseJSON(transport);
          }
          ajaxResponse =  {"type": "success", "msg": response};
        },
        error: function(){
          ajaxResponse =  {"type": "failure", "msg": "Some Error Occured"};
        },
        complete: function(){
          if(typeof(callback) !== "undefined"){
            callback(ajaxResponse);
          }
        }
      });
    },

    showAlertMessage : function(msgType, elem, msg, scrollTop) {
      var alertNode = VisitorManager.alertHtml;
      if(msgType == "success"){
        jQuery(elem).html(alertNode);
        jQuery(elem).find("div").addClass("alert-success");
        jQuery(elem).find("p").append(msg);
        setTimeout(function(){jQuery(".alert").alert("close");}, 5000);
      }else{
        jQuery(elem).html(alertNode);
        jQuery(elem).find("div").addClass("alert-danger");
        jQuery(elem).find("p").append(msg);
      }
      if(scrollTop == 1){
        jQuery('#content').animate({scrollTop : 0}, 500);
      }
    },

    showDialog : function(elem) {
      jQuery(elem).modal('show');
    },

    closeDialog : function(elem) {
      jQuery(elem).modal('hide');
      jQuery(".alert").alert("close");
    }


}

DateUtil = {
  monthsShort : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

  getMonthShortString : function(mm) {
    return DateUtil.monthsShort[mm];
  },

  getDayToDisplay : function(dd) {
    if(dd < 10) {
      dd='0'+dd
    }
    return dd;
  },

  getCurDateToDisplay : function() {
    var d = new Date();
    var mon = DateUtil.getMonthShortString(d.getMonth());
    var dd = DateUtil.getDayToDisplay(d.getDate());

    return dd+'-'+mon+'-'+d.getFullYear();
  }
}

ImageUpload = {

  files : "",

  init : function() {
    jQuery('#add_vm_img').on("click",function(e){
      jQuery(this).prev().trigger("click");
    });  

    jQuery('#vm_image').on("change", function(e){

      var ext = $('#vm_image').val().split('.').pop().toLowerCase();
      
      if(jQuery.inArray(ext, ['gif','png','jpg']) == -1) {
        jQuery('#vm_image').val('');
        AjaxUtil.showAlertMessage("failure", "#show_error", 'Unsupported format.<br>', 0);
        return;
      }

      
      ImageUpload.files = this.files;
      ImageUpload.readInputFile(this.files, jQuery("#preview-image").find(".preview-profile-image"));
      
    });

  },
  
  readInputFile : function (input, elem) {
    if (input && input[0]) {  
      var ImageDir = new FileReader();  
      ImageDir.onload = function(e) {  
        jQuery(elem).css('background-image', 'url('+e.target.result+')');  
      }; 
      ImageDir.readAsDataURL(input[0]);  
    }
  },

  validateImageExt : function(fileElem) {
    var fileName = jQuery(fileElem).val();
    if(fileName){
      var fileExt = fileName.split('.').pop().toLowerCase();
      if (fileName.indexOf(".") == -1){
        fileExt = "";
      }
      var allowedExt = ["jpg", "gif", "png"];
      if(allowedExt.indexOf(fileExt) == -1){
        return false;
      }
    }
    return true;
  },
  
  imageSizeValidation : function(fileElem, sizeLimit) {
    var totalFileSize = 0;
    if(!window.File){
      try{
        var fileSo = new ActiveXObject('Scripting.FileSystemObject');
      }
      catch(e){
        alert('Kindly Enable ActiveX from Tools -> Internet Options -> Security -> \nCustom Level -> Reset custom settings to Medium -> Click Reset.\n In Settings scroll down to Active X Controls and plugins -> Select Prompt for\n Download unsigned ActiveX  Controls and \n Initialize and script ActiveX Controls. ');
        return false;
      }
      
      var fileName = jQuery(fileElem).val();
      totalFileSize += fileSo.getFile(fileName).size;

      if((totalFileSize/1000000) > sizeLimit){
        return false; 
      }
      else{
        return true;
      }
    }else{
      fileElem.each(function(key, fileField){
        if(fileField.files[0]){
          totalFileSize += Math.round((fileField.files[0].size)/1024);
        }
      });
      if((totalFileSize/1024) > sizeLimit){
        return false;
      }
      else{
        return true;
      }
    }
  }

}

SecurityGaurd = {

  name : '',
  badge : '',
  mobile : '',

  init : function(name, badge, mobile){
    this.name = name;
    this.badge = badge;
    this.mobile = mobile;
  },

  resetSecurityGaurd : function() {
    this.name = '';
    this.badge = '';
    this.mobile = '';
  }

}

VisitorManager = {

	alertHtml : '<div class="alert">'
	            +'<button type="button" class="close" data-dismiss="alert">×</button>'
	            +'<p></p>'
	            +'</div>',

  sampleRow : '<div class="row"><a href="javascript:void(0)" class="vm-lists">'
              +'<div class="dp-img-dropbox"><div class="img-rounded preview-profile-image"></div></div>'
              +'<div class="vm-details"><span class="text-capitalize text-primary"></span>'
              +'<p class="mobile"></p><p></p></div></a><div class="vm-switch">'
              +'<label class="switch switch-success switch-button">'
              +'<input type="checkbox" name="status" data-badge="" data-name="" checked="checked"><i></i>'
              +'</label><a href="javascript:void(0)" class="del-vm hide" data-badge="">'
              +'<i class="glyphicon glyphicon-trash"></i></a></div></div>',
  
  
  targetElem : "",

	progress : 0,
  
	init : function() {
		jQuery("#add_account").on("click", function() {
			AjaxUtil.showDialog("#add_account_dialog");
		});

    jQuery("#add_account_dialog").find(".btn-submit").on("click", function(e) {
      e.preventDefault();
      VisitorManager.handleFormSubmit(VisitorManager.postSubmit);
    });

    jQuery("#add_account_dialog").find(".btn-update").on("click", function(e) {
      e.preventDefault();
      VisitorManager.handleFormSubmit(VisitorManager.postUpdate);
    });

    jQuery("#vm_list").on("change", "input[name='status']", function(e){
      VisitorManager.changeStatus(e);
    });

    jQuery("#vm_list").on("click", ".del-vm", function(e){
      e.preventDefault();
      VisitorManager.handleDeleteVM(e);
    });

    jQuery("#vm_list").on("click", ".vm-lists", function(e){
      e.preventDefault();
      VisitorManager.handleEditVM(e);
    });

    jQuery("#rmv_account").on("click", function(e){
      jQuery("#rmv_account").addClass("hide");
      jQuery("#add_account").addClass("hide");
      jQuery("#done_account").removeClass("hide");
      jQuery("#vm_list").find(".switch").addClass("hide");
      jQuery("#vm_list").find(".del-vm").removeClass("hide");
    });

    jQuery("#done_account").on("click", function(e){
      jQuery("#rmv_account").removeClass("hide");
      jQuery("#add_account").removeClass("hide");
      jQuery("#done_account").addClass("hide");
      jQuery("#vm_list").find(".switch").removeClass("hide");
      jQuery("#vm_list").find(".del-vm").addClass("hide");
    });

    jQuery("#delete_vm").find(".btn-submit").on("click", function(e) {
      e.preventDefault();
      VisitorManager.confirmDelete();
    });

    jQuery("#delete_vm").find(".btn-default").on("click", function(e) {
      e.preventDefault();
      SecurityGaurd.resetSecurityGaurd();
    });
	},

	handleFormSubmit : function(callback) {

    if(VisitorManager.progress == 0) {
      VisitorManager.progress = 1;
      jQuery("#add_account_dialog").find(".btn-submit").attr("disabled", "disabled");
      jQuery("#add_account_dialog").find(".btn-update").attr("disabled", "disabled");
      SecurityGaurd.init(jQuery("#add_vm").find("input[name='name']").val(), jQuery("#add_vm").find("input[name='badge_id']").val(), jQuery("#add_vm").find("input[name='mobile_number']").val());
      if(VisitorManager.validateForm()) {
        VisitorManager.processForm(callback);
      }else {
        VisitorManager.resetFormSubmitAction();
      }
    }

  },

  processForm: function(callback) {
    formData = new FormData(document.getElementById("add_vm"));
    //formData = jQuery("#add_vm").serialize();
    AjaxUtil.ajaxFileUploadAction(jQuery("#add_vm").attr('action'), 'POST', formData, callback, 'json-response');
  },

  postSubmit: function(response) {

    if(response.type == "success") {
      if(response.msg.data.action_status.toLowerCase() == "duplicate" || response.msg.data.action_status.toLowerCase() == "failure"){
        AjaxUtil.showAlertMessage("failure", "#show_error", response.msg.data.action_msg+"<br>", 0);
      }else {
        VisitorManager.resetForm();
        AjaxUtil.showAlertMessage("success", "#alert_div", SecurityGaurd.name +" added successfully. <br>", 1);
        VisitorManager.addRow();
        VisitorManager.resetImageCache();
        SecurityGaurd.resetSecurityGaurd();
      }
    }else{
      AjaxUtil.showAlertMessage("failure", "#alert_div", "Could not perform action. We are looking into it. <br>", 1);
      VisitorManager.resetImageCache();
      SecurityGaurd.resetSecurityGaurd();
    }
    VisitorManager.resetFormSubmitAction();
    
  }

}


