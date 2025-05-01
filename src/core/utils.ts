import { config } from "./config";

const search_token_by_id = (id:string) =>
{
    for(const i in config.chains)
    {
        if(config.chains[i].id == id.toUpperCase())
        {
            return config.chains[i];
        }
    }
    return false
}

export {
    search_token_by_id
}