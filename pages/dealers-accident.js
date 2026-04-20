import { makeDirectoryPage } from '../lib/pages/dealers-directory-page'

const { DealersDirectoryPage, getServerSideProps } = makeDirectoryPage({
  type: 'accident',
  canonicalPath: '/dealers-accident/',
})

export default DealersDirectoryPage
export { getServerSideProps }
