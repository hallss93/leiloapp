const list = localStorage.getItem('address')
  ? JSON.parse(localStorage.getItem('address'))
  : []
export const state = () => ({
  list,
})

export const mutations = {
  add(state, address) {
    const address_list = JSON.parse(localStorage.getItem('address'))
    localStorage.setItem(
      'address',
      JSON.stringify(address_list ? address_list.concat(address) : [address])
    )
    state.list.push(address)
  },
  edit(state, { address, index }) {
    state.list[index] = address
    localStorage.setItem('address', JSON.stringify(state.list))
  },
  remove(state, index) {
    state.list.splice(index, 1)
    localStorage.setItem('address', JSON.stringify(state.list))
  },
}
