while GetResourceState("gksphone") ~= "started" do
    Wait(500)
end

CreateThread(function()
    local appData = {
        name = "vue3CustomApp",
        icons = "https://cfx-nui-gksphone/html/img/icons/qbit.png",
        categori = "mix",
        appurl = "https://cfx-nui-".. GetCurrentResourceName() .."/ui/dist/index.html",
        url = "/customapp",
        blockedjobs = {},
        allowjob = {},
        signal = true,
        show = true,
        labelLangs = {
            af = "Custom App",
            ar = "Custom App",
            cs = "Custom App",
            de = "Custom App",
            en = "Custom App",
            es = "Custom App",
            fr = "Custom App",
            id = "Custom App",
            nl = "Custom App",
            ["pt-PT"] = "Custom App",
            ro = "Custom App",
            sv = "Custom App",
            th = "Custom App",
            tr = "Custom App",
            uk = "Custom App",
            ["zh-TW"] = "Custom App"
        }
    }
    exports["gksphone"]:AddCustomApp(appData)
end)