//@input Component.ScriptComponent imageBtn;
//@input Component.ScriptComponent InternetModuleManager;

script.createEvent("OnStartEvent").bind(()=>{
   script.imageBtn.onPressDown.add(()=>{
    script.InternetModuleManager.FetchRemoteImage();
   })
})