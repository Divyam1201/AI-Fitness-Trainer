const clients = new Map()

const addClient = (res,id)=>{
    clients.set(id,res)
}

const removeClient = (res,id)=>{
    clients.delete(id,res)
}

const sendUserPlan = (id)=>{
    const res = clients.get(id)
     if (!res) return;
    res.write("planReady")
}

