RegisterNUICallback('dataCheck', function(data, cb)
    print("LOG: dataCheck", json.encode(data))
    exports["gksphone"]:NuiSendMessage({event = 'app', app = data.id})
    cb('ok')
end)

RegisterNUICallback('getInfo', function(data, cb)
    print("LOG: getInfo")
    cb('ok')
end)
