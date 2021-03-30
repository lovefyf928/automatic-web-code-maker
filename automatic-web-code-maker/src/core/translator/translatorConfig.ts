export interface TranslatorConfig {
    elementList: any
    fileName: string
}

interface event {
    eventName: string
    eventFn: Function
}

interface elementAtt {
    elementAttName: string
    elementAttVal: string
}

export interface TranslatorElementConfig {
    event: event[]
    elementAtt: elementAtt[]
}

