/* 
 * ABFieldImage
 * A Property manager for our ABFieldImage.
 */

import FFieldClass from "./ABField";

export default function (AB) {
   const ABField = FFieldClass(AB);
   const L = ABField.L();

   class ABFieldImage extends ABField {
      constructor(ibase = "properties_abfield") {
         super(`${ibase}_image`, {
            imageWidth: "",
            imageHeight: "",
            imageContainer: "",
            defaultImageUrl: "",

            useWidth: "",
            useHeight: "",
            useDefaultImage: "",
         });
      }

      ui() {
         const ids = this.ids;

         return super.ui([
            {
               cols: [
                  {
                     view: "label",
                     label: L("Width:"),
                     align: "right",
                     width: 60,
                  },
                  {
                     id: ids.useWidth,
                     view: "checkbox",
                     name: "useWidth",
                     width: 30,
                     value: 1,
                     click: function () {
                        if (this.getValue()) $$(ids.imageWidth).enable();
                        else $$(ids.imageWidth).disable();
                     },
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
                  {
                     id: ids.imageWidth,
                     view: "text",
                     name: "imageWidth",
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
               ],
            },
            {
               cols: [
                  {
                     view: "label",
                     label: L("Height:"),
                     align: "right",
                     width: 60,
                  },
                  {
                     id: ids.useHeight,
                     view: "checkbox",
                     name: "useHeight",
                     width: 30,
                     value: 1,
                     click: function () {
                        if (this.getValue()) $$(ids.imageHeight).enable();
                        else $$(ids.imageHeight).disable();
                     },
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
                  {
                     view: "text",
                     name: "imageHeight",
                     id: ids.imageHeight,
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
               ],
            },
            {
               cols: [
                  {
                     view: "label",
                     label: L("Default image:"),
                     align: "right",
                     width: 100,
                  },
                  {
                     id: ids.useDefaultImage,
                     view: "checkbox",
                     name: "useDefaultImage",
                     value: 0,
                     click: function () {
                        if (this.getValue()) $$(ids.imageContainer).enable();
                        else $$(ids.imageContainer).disable();
                     },
                     on: {
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
               ],
            },
            {
               id: ids.imageContainer,
               disabled: true,
               cols: [
                  {},
                  {
                     view: "uploader",
                     id: ids.defaultImageUrl,
                     template: `<div style="text-align:center; font-size: 30px;">
                           <div class="default-image-holder">
                              <div class="image-data-field-icon">
                                 <i class="fa fa-picture-o fa-2x"></i>
                                 <div style="font-size: 15px;">${L(
                                    "Drag and drop or click here"
                                 )}</div>
                              </div>
                              <div class="image-data-field-images" style="display:flex; flex-wrap:wrap; gap:5px;">
                                 <!-- Images will be added here dynamically -->
                              </div>
                           </div>
                        </div>`,
                     apiOnly: true,
                     inputName: "file",
                     multiple: true, // Modified to support multiple file uploads
                     name: "defaultImageUrl",
                     height: 105,
                     width: 350, // Increase width to accommodate multiple images
                     on: {
                        // when a file is added to the uploader
                        onBeforeFileAdd: function (item) {
                           // verify file type
                           const acceptableTypes = [
                              "jpg",
                              "jpeg",
                              "bmp",
                              "png",
                              "gif",
                           ];
                           const type = item.type.toLowerCase();
                           if (acceptableTypes.indexOf(type) == -1) {
                              //// TODO: multilingual
                              webix.message(
                                 L("Only [{0}] images are supported", [
                                    acceptableTypes.join(", "),
                                 ])
                              );

                              return false;
                           }
                        },
                        // if an error was returned
                        onFileUploadError: function (item, response) {
                           AB.notify.developer(
                              new Error("Error loading image"),
                              {
                                 message: "Error loading image",
                                 response,
                              }
                           );
                        },
                        onAfterRender: function () {
                           ABField.CYPRESS_REF(this);
                        },
                     },
                  },
                  {},
               ],
            },
         ]);
      }

      urlImage(id) {
         return `/file/${id}`;
      }

      urlUpload(isWebix = true) {
         return `/file/upload/${this.CurrentObjectID}/${this.CurrentFieldID}/${
            isWebix ? "1" : "0"
         }`;
      }
      /**
       * @method FieldClass()
       * Call our Parent's _FieldClass() helper with the proper key to return
       * the ABFieldXXX class represented by this Property Editor.
       * @return {ABFieldXXX Class}
       */
      FieldClass() {
         return super._FieldClass("image");
      }

      populate(field) {
         const ids = this.ids;
         const uploader = $$(ids.defaultImageUrl);
         const value = field.settings.defaultImageUrl;
         const isUseDefaultImage = field.settings.useDefaultImage;

         super.populate(field);

         if (field.settings.useDefaultImage) {
            $$(ids.imageContainer).enable();
         }

         if (value && isUseDefaultImage) {
            // Handle multiple UUID values (separated by commas)
            const uuids = value.split(',').filter(uuid => uuid.trim());
            
            uploader.attachEvent("onAfterRender", () => {
               const parentContainer = uploader.$view.querySelector(
                  ".default-image-holder"
               );
               parentContainer.querySelector(
                  ".image-data-field-icon"
               ).style.display = uuids.length ? "none" : "";
               
               const imagesContainer = parentContainer.querySelector(
                  ".image-data-field-images"
               );
               imagesContainer.style.display = uuids.length ? "flex" : "none";
               
               // Clear existing images
               imagesContainer.innerHTML = '';
               
               // add all images
               uuids.forEach(uuid => {
                  if (!uuid) return;
                  
                  const imageDiv = document.createElement('div');
                  imageDiv.className = 'image-data-field-image';
                  imageDiv.style.cssText = `
                     position: relative;
                     width: 80px;
                     height: 80px;
                     background-size: contain;
                     background-repeat: no-repeat;
                     background-position: center;
                     background-image: url('${this.urlImage(uuid)}');
                     margin: 2px;
                  `;
                  
                  const deleteBtn = document.createElement('a');
                  deleteBtn.className = 'ab-delete-photo';
                  deleteBtn.href = 'javascript:void(0);';
                  deleteBtn.style.cssText = `
                     position: absolute;
                     top: 0;
                     right: 0;
                     background: rgba(0,0,0,0.5);
                     color: white;
                     border-radius: 50%;
                     width: 20px;
                     height: 20px;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                  `;
                  
                  const icon = document.createElement('i');
                  icon.className = 'fa fa-times delete-image';
                  deleteBtn.appendChild(icon);
                  
                  deleteBtn.addEventListener('click', (e) => {
                     e.stopPropagation();
                     
                     // Remove a UUID from an array
                     const index = uuids.indexOf(uuid);
                     if (index !== -1) {
                        uuids.splice(index, 1);
                        $$(ids.defaultImageUrl).setValue(uuids.join(','));
                     }
                     
                     // Remove from DOM
                     imageDiv.remove();
                     
                     // If there are no pictures, show the upload prompt
                     if (uuids.length === 0) {
                        parentContainer.querySelector(
                           ".image-data-field-icon"
                        ).style.display = "";
                        imagesContainer.style.display = "none";
                     }
                  });
                  
                  imageDiv.appendChild(deleteBtn);
                  imagesContainer.appendChild(imageDiv);
               });
            });

            // Add click event handling
            uploader.$view.addEventListener("click", (e) => {
               if (e.target.className.indexOf("delete-image") > -1 || 
                   e.target.parentElement.className.indexOf("ab-delete-photo") > -1) {
                  // Event handled on image element
                  return;
               }
            });
         }
      }

      show() {
         const ids = this.ids;
         const url = this.urlUpload(true);

         const uploader = $$(ids.defaultImageUrl);
         uploader.config.upload = url;
         
         // 用于存储当前上传的图片UUID
         const currentImages = [];
         
         uploader.attachEvent("onFileUpload", (file, response) => {
            const uuid = response.data.uuid;
            currentImages.push(uuid);
            $$(ids.defaultImageUrl).setValue(currentImages.join(','));
            
            const parentContainer = uploader.$view.querySelector(
               ".default-image-holder"
            );
            parentContainer.querySelector(
               ".image-data-field-icon"
            ).style.display = "none";
            
            const imagesContainer = parentContainer.querySelector(
               ".image-data-field-images"
            );
            imagesContainer.style.display = "flex";
            
            // Used to store the UUID of the currently uploaded image
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-data-field-image';
            imageDiv.style.cssText = `
               position: relative;
               width: 80px;
               height: 80px;
               background-size: contain;
               background-repeat: no-repeat;
               background-position: center;
               background-image: url('${this.urlImage(uuid)}');
               margin: 2px;
            `;
            
            const deleteBtn = document.createElement('a');
            deleteBtn.className = 'ab-delete-photo';
            deleteBtn.href = 'javascript:void(0);';
            deleteBtn.style.cssText = `
               position: absolute;
               top: 0;
               right: 0;
               background: rgba(0,0,0,0.5);
               color: white;
               border-radius: 50%;
               width: 20px;
               height: 20px;
               display: flex;
               align-items: center;
               justify-content: center;
            `;
            
            const icon = document.createElement('i');
            icon.className = 'fa fa-times delete-image';
            deleteBtn.appendChild(icon);
            
            deleteBtn.addEventListener('click', (e) => {
               e.stopPropagation();
               
               // 从数组中移除UUID
               const index = currentImages.indexOf(uuid);
               if (index !== -1) {
                  currentImages.splice(index, 1);
                  $$(ids.defaultImageUrl).setValue(currentImages.join(','));
               }
               
               // 从DOM中移除
               imageDiv.remove();
               
               // 如果没有图片了，显示上传提示
               if (currentImages.length === 0) {
                  parentContainer.querySelector(
                     ".image-data-field-icon"
                  ).style.display = "";
                  imagesContainer.style.display = "none";
               }
            });
            
            imageDiv.appendChild(deleteBtn);
            imagesContainer.appendChild(imageDiv);
         });
         
         uploader.attachEvent("onAfterRender", () => {
            const parentContainer = uploader.$view.querySelector(
               ".default-image-holder"
            );
            parentContainer.querySelector(
               ".image-data-field-icon"
            ).style.display = "";
            
            const imagesContainer = parentContainer.querySelector(
               ".image-data-field-images"
            );
            imagesContainer.style.display = "none";
            imagesContainer.innerHTML = '';
            
            // 初始化当前图片数组
            const initialValue = $$(ids.defaultImageUrl).getValue();
            if (initialValue) {
               currentImages.length = 0;
               initialValue.split(',').forEach(uuid => {
                  if (uuid.trim()) currentImages.push(uuid.trim());
               });
            }
         });
         
         uploader.addDropZone(uploader.$view);
         uploader.render();

         super.show();
      }

      clear() {
         const ids = this.ids;

         super.clear();

         $$(ids.useWidth).setValue(0);
         $$(ids.useHeight).setValue(0);
         $$(ids.useDefaultImage).setValue(0);

         $$(ids.imageWidth).setValue("");
         $$(ids.imageHeight).setValue("");
         $$(ids.defaultImageUrl).setValue("");
      }
   }

   return ABFieldImage;
}