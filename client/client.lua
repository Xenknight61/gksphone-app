RegisterNUICallback('dataCheck', function(data, cb)
    print("LOG: ", json.encode(data))
    SendNUIMessage({event = 'app', app = data.id})
    cb('ok')
end)
