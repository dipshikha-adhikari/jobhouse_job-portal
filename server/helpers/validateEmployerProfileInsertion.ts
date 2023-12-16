
export const isValidBasicInformation = (info: any) => {
    return ((info.image !== undefined || true) &&
        (info.cover_mage !== undefined || true) &&
        info.industry_type !== undefined &&
        info.summary !== undefined && info.organization_name !== undefined && info.address !== undefined && info.phone_number !== undefined && info.email !== undefined)
}

export const isValidOtherInformation = (contact: any) => {
    return ( (contact.website !== undefined || true))
}



