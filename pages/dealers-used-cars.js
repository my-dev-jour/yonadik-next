import { makeDirectoryPage } from '../lib/pages/dealers-directory-page'

const { DealersDirectoryPage, getServerSideProps } = makeDirectoryPage({
  type: 'used',
  canonicalPath: '/dealers-used-cars/',
})

export default DealersDirectoryPage
export { getServerSideProps }
