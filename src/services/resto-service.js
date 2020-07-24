export default class RestoService {
  _apiBase = 'http://localhost:3000';
  
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, status: ${res.status}`)
    }
    
    return await res.json();
  };

  async getMenuItemsAll() {
    return await this.getResource('/menu/');
  };

  async getMenuItem(id) {
    return await this.getResource(`/menu/?id=${id}`);
  };

  async getLastNumberOrder() {
    const res = await this.getResource('/orders/');
    const numberOrder = res.length + 1;
    return numberOrder;
  };

  async sendOrder(order) {
    const numberOrder = await this.getLastNumberOrder();

    const newOrder = {
      id: numberOrder,
      order: order,
    }

    return await fetch(`${this._apiBase}/orders`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  };
}