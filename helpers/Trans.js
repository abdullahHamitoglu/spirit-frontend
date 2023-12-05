import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Trans(key) {
    const { t } = useTranslation();
    return t(key)
}
