//Visual Interface
class ISuscriber
{
    constructor()
    {

    }

    update(data, i)
    {
        throw new Error("Abstract method, it has that be implement.")
    }

}
//Algoritm
class IPublisher
{
    constructor()
    {
        this.suscribers = []
    }

    addSuscriber(suscriber)
    {
        throw new Error("Abstract method, it has that be implement.")
    }

    notifySuscribers()
    {
        throw new Error("Abstract method, it has that be implement.")
    }
}



export {IPublisher, ISuscriber}