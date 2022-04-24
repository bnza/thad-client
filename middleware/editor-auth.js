export default function ({$auth, redirect, store}) {
  if (!$auth.hasScope('ROLE_EDITOR')) {
    store.dispatch('snackbar/show',{
      text: 'You have no access to this content [403]',
      color: 'error',
      timeout: -1
    })
    redirect('/')
  }
}
