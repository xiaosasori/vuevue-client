(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b47b6d0"],{6587:function(t,e,s){},9430:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"text-xs-center"},[s("v-flex",{attrs:{sm6:"","offset-sm3":""}},[s("v-card",{staticClass:"white--text",attrs:{color:"secondary"}},[s("v-layout",[s("v-flex",{attrs:{xs5:""}},[s("v-img",{attrs:{height:"125px",contain:"",src:t.user.avatar}})],1),s("v-flex",{attrs:{xs7:""}},[s("v-card-title",{attrs:{"primary-title":""}},[s("div",[s("div",{staticClass:"headline"},[t._v(t._s(t.user.username))]),s("div",[t._v("Joined "+t._s(t.user.joinDate))]),s("div",{staticClass:"hidden-xs-only font-weight-thin"},[t._v(t._s(t.user.favorites.length)+" Favorites")]),s("div",{staticClass:"hidden-xs-only font-weight-thin"},[t._v(t._s(t.userPosts.length)+" Posts Added")])])])],1)],1)],1)],1),t.userFavorites.length?s("v-container",{staticClass:"mt-3"},[s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"font-weight-light"},[t._v("\n\t\t\t\tFavorited\n\t\t\t\t"),s("span",{staticClass:"font-weight-regular"},[t._v("("+t._s(t.userFavorites.length)+")")])])]),s("v-layout",{attrs:{row:"",wrap:""}},t._l(t.userFavorites,function(e){return s("v-flex",{key:e._id,attrs:{xs12:"",sm6:""}},[s("v-card",{staticClass:"mt-3 ml-1 mr-2",attrs:{hover:""}},[s("v-img",{attrs:{height:"30vh",src:e.imageUrl},on:{click:function(s){t.goToPost(e._id)}}}),s("v-card-text",[t._v(t._s(e.title))])],1)],1)}),1)],1):s("v-container",[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",[t._v("You have no favorites currently. Go and add some!")])])],1)],1),t.userPosts.length?s("v-container",{staticClass:"mt-3"},[s("v-flex",{attrs:{xs12:""}},[s("h2",{staticClass:"font-weight-light"},[t._v("\n\t\t\t\tYour Posts\n\t\t\t\t"),s("span",{staticClass:"font-weight-regular"},[t._v("("+t._s(t.userPosts.length)+")")])])]),s("v-layout",{attrs:{row:"",wrap:""}},t._l(t.userPosts,function(e){return s("v-flex",{key:e._id,attrs:{xs12:"",sm6:""}},[s("v-card",{staticClass:"mt-3 ml-1 mr-2",attrs:{hover:""}},[s("v-btn",{attrs:{color:"info",floating:"",fab:"",small:"",dark:""},on:{click:function(s){t.loadPost(e)}}},[s("v-icon",[t._v("edit")])],1),s("v-btn",{attrs:{color:"error",floating:"",fab:"",small:"",dark:""},on:{click:function(s){t.handleDeleteUserPost(e)}}},[s("v-icon",[t._v("delete")])],1),s("v-img",{attrs:{height:"30vh",src:e.imageUrl},on:{click:function(s){t.goToPost(e._id)}}}),s("v-card-text",[t._v(t._s(e.title))])],1)],1)}),1)],1):s("v-container",[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h2",[t._v("You have no posts currently. Go and add some!")])])],1)],1),s("v-dialog",{attrs:{xs12:"",sm6:"","offset-sm3":"",persistent:""},model:{value:t.editPostDialog,callback:function(e){t.editPostDialog=e},expression:"editPostDialog"}},[s("v-card",[s("v-card-title",{staticClass:"headline grey lighten-2"},[t._v("Update Post")]),s("v-container",[s("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.handleUpdateUserPost(e)}},model:{value:t.isFormValid,callback:function(e){t.isFormValid=e},expression:"isFormValid"}},[s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{rules:t.titleRules,label:"Post Title",type:"text",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1),s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{rules:t.imageRules,label:"Image URL",type:"text",required:""},model:{value:t.imageUrl,callback:function(e){t.imageUrl=e},expression:"imageUrl"}})],1)],1),s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:""}},[s("img",{attrs:{src:t.imageUrl,height:"300px"}})])],1),s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-select",{attrs:{rules:t.categoriesRules,items:["Art","Education","Food","Furniture","Travel","Photography","Technology"],multiple:"",label:"Categories"},model:{value:t.categories,callback:function(e){t.categories=e},expression:"categories"}})],1)],1),s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-textarea",{attrs:{rules:t.descRules,label:"Description",type:"text",required:""},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1)],1),s("v-divider"),s("v-card-actions",[s("v-spacer"),s("v-btn",{staticClass:"success--text",attrs:{disabled:!t.isFormValid,type:"submit",flat:""}},[t._v("Update")]),s("v-btn",{staticClass:"error--text",attrs:{flat:""},on:{click:function(e){t.editPostDialog=!1}}},[t._v("Cancel")])],1)],1)],1)],1)],1)],1)},a=[],r=s("be94"),o=s("2f62"),l={name:"Profile",data:function(){return{editPostDialog:!1,isFormValid:!0,title:"",imageUrl:"",categories:[],description:"",titleRules:[function(t){return!!t||"Title is required"},function(t){return t.length<20||"Title must have less than 20 characters"}],imageRules:[function(t){return!!t||"Image is required"}],categoriesRules:[function(t){return t.length>=1||"At least one category is required"}],descRules:[function(t){return!!t||"Description is required"},function(t){return t.length<200||"Description must have less than 200 characters"}]}},computed:Object(r["a"])({},Object(o["b"])(["user","userFavorites","userPosts"])),created:function(){this.handleGetUserPosts()},methods:{goToPost:function(t){this.$router.push("/posts/".concat(t))},handleGetUserPosts:function(){this.$store.dispatch("getUserPosts",{userId:this.user._id})},handleUpdateUserPost:function(){this.$refs.form.validate()&&(this.$store.dispatch("updateUserPost",{postId:this.postId,userId:this.user._id,title:this.title,imageUrl:this.imageUrl,categories:this.categories,description:this.description}),this.editPostDialog=!1)},handleDeleteUserPost:function(t){this.loadPost(t,!1);var e=window.confirm("Are you sure you want to delete this post?");e&&this.$store.dispatch("deleteUserPost",{postId:this.postId})},loadPost:function(t){var e=t._id,s=t.title,i=t.imageUrl,a=t.categories,r=t.description,o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.editPostDialog=o,this.postId=e,this.title=s,this.imageUrl=i,this.categories=a,this.description=r}}},n=l,c=(s("a8aa"),s("2877")),u=Object(c["a"])(n,i,a,!1,null,null,null);u.options.__file="Profile.vue";e["default"]=u.exports},a8aa:function(t,e,s){"use strict";var i=s("6587"),a=s.n(i);a.a}}]);
//# sourceMappingURL=chunk-6b47b6d0.d9b650e7.js.map