const clients = new Map()

export const addClient = (res,id)=>{
    clients.set(id,res)
}

export const removeClient = (res,id)=>{
    clients.delete(id,res)
}

export const sendUserPlan = (id)=>{
    const res = clients.get(id)
     if (!res) return;
    res.write("planReady")
}

