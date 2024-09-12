import ComponentLoading from "./ComponentLoading"

const PageLoading = () => {
    return (
        <div className='page-loading fixed top-0 left-0 w-full h-viewScreen bg-white'>
            <ComponentLoading className='xy-center' />
        </div>
    )
}

export default PageLoading