RegisterNUICallback('dataCheck', function(data, cb)
    print("LOG: ", json.encode(data))
    cb('ok')
end)