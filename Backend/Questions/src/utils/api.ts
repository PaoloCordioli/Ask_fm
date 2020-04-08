import fetch from 'node-fetch'

export const get_id_username = async (username: string) => {
    const get = await fetch(`https://ask-auth.now.sh/users/${username}`)
    const result = await get.json()
    return result.data.id_user
}