//@input Component.ScriptComponent imageBtn;
//@input Component.ScriptComponent videoBtn;
//@input Component.ScriptComponent audioBtn;
//@input Component.ScriptComponent _3dModelBtn;

//@input Component.ScriptComponent InternetModuleManager;

script.createEvent("OnStartEvent").bind(() => {
   script.imageBtn.onPressDown.add(() => {
      script.InternetModuleManager.FetchRemoteImage();
   })

   script.videoBtn.onPressDown.add(() => {
      script.InternetModuleManager.FetchRemoteVideo();
   })

   script.audioBtn.onPressDown.add(() => {
      script.InternetModuleManager.FetchAudio();
   })

   script._3dModelBtn.onPressDown.add(() => {
      script.InternetModuleManager.FetchGltf();
   })

})
