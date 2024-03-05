import { DialogProviderInst, MessageProviderInst, NotificationProviderInst } from 'naive-ui'
declare global {
  interface Window {
    $message: MessageProviderInst
    $dialog: DialogProviderInst
    $notification: NotificationProviderInst
  }
}
